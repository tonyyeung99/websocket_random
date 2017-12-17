import os
import gevent
from gevent import monkey, sleep
monkey.patch_all()
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from random import randint
import threading
from flask import request



app = Flask(__name__, static_path='/static')
socketio = SocketIO(app, async_mode='gevent')

messages = [{'text': 'Random Number Generator', 'name': 'Random'}]
current_server_speed = 600
#############

# random number Generator Thread
thread = threading.Thread()
thread_stop_event = threading.Event()


class RandomThread(threading.Thread):
    def __init__(self):
        self.delay = 1
        super(RandomThread, self).__init__()

    def randomNumberGenerator(self):
        """
        Generate a random number every 1 second and emit to a socketio instance (broadcast)
        Ideally to be run in a separate thread?
        """
        # infinite loop of magical random numbers
        # while not thread_stop_event.isSet():
        while True:
            # number = round(random() * 10, 3)
            number = randint(1, 100)
            socketio.emit('newnumber', randint(1, 100), namespace='/random')
            print("Current_server_speed="+str(current_server_speed))
            socketio.sleep(current_server_speed/1000)


    def run(self):
        self.randomNumberGenerator()


##########


@app.route("/")
def random():
    return render_template('random_number.html')
# @app.route("/")
# def hello():
#     return "Hello World!"

@app.route("/tab1")
def tab1():
    print("tab1 called")
    return render_template('tab1.html')

@app.route("/tab2")
def tab2():
    print("tab2 called")
    return render_template('tab2.html')

@app.route("/get_server_speed")
def getServerSpeed():
    print("get server speed called")
    return str(current_server_speed)

@app.route("/server_speed")
def setServerSpeed():
    print("server speed called")
    global current_server_speed
    current_server_speed = int(request.args.get('new_speed'))
    return request.args.get('new_speed')

@socketio.on('connect', namespace='/random')
def makeConnection():
    print('connected')
    for message in messages:
        print(message)
        socketio.emit('message', message, namespace='/random')
        #############
        global thread
        print('Client connected')

        #Start the random number generator thread only if the thread has not been started before.
        if not thread.isAlive():
            print("Starting Thread")
            thread = RandomThread()
            thread.start()
        ###########


# @socketio.on('startnewnumber', namespace='/random')
# def startNewNumber(message):
#     print("startNewNumber()")
#     # sendNewNumber()

# def sendNewNumber():
#     for number in range(100):
#         print("Sending NewNumber!")
#         socketio.emit('newnumber', randint(1, 100), namespace='/random')
#         socketio.sleep(0.5);


# @app.route('/random')
# def random():
#     return render_template('random_number.html')


if __name__ == "__main__":
    socketio.run(app, host=os.getenv('IP', '0.0.0.0'), port =int(os.getenv('PORT', 8080)), debug=True)
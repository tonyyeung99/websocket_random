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

MAX_SLEEP_INTERVAL = 10000 # in ms
current_server_interval = 500  # in ms


# random number Generator Thread
thread = threading.Thread()
thread_stop_event = threading.Event()


class RandomThread(threading.Thread):
    def __init__(self):
        super(RandomThread, self).__init__()

    def randomNumberGenerator(self):
        # infinite loop of magical random numbers
        # while not thread_stop_event.isSet():
        while True:
            number = randint(1, 100)
            socketio.emit('newnumber', number, namespace='/random')
            sleep_interval = current_server_interval if MAX_SLEEP_INTERVAL > current_server_interval else MAX_SLEEP_INTERVAL
            socketio.sleep(sleep_interval / 1000)

    def run(self):
        self.randomNumberGenerator()


@app.route("/")
def random():
    return render_template('random_number.html')


@app.route("/get_server_interval")
def getServerSpeed():
    return str(current_server_interval)


@app.route("/set_server_interval")
def setServerSpeed():
    global current_server_interval
    current_server_interval = int(request.args.get('new_interval'))
    print("New Speed is : " + str(current_server_interval))
    return str(current_server_interval)


@socketio.on('connect', namespace='/random')
def makeConnection():
    global thread
    print('Client connected')
    # Start the random number generator thread only if the thread has not been started before.
    if not thread.isAlive():
        thread = RandomThread()
        thread.start()


if __name__ == "__main__":
    socketio.run(app, host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8888)), debug=True)

import os
import gevent
from gevent import monkey, sleep
monkey.patch_all()
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from random import randint


app = Flask(__name__, static_path='/static')
socketio = SocketIO(app, async_mode='gevent')

messages = [{'text': 'Random Number Generator', 'name': 'Random'}]

@app.route("/")
def hello():
    return "Hello World!"

@socketio.on('connect', namespace='/random')
def makeConnection():
    print('connected')
    for message in messages:
        print(message)
        socketio.emit('message', message, namespace='/random')

@socketio.on('startnewnumber', namespace='/random')
def startNewNumber(message):
    print("startNewNumber()")
    sendNewNumber()

def sendNewNumber():
    for number in range(100):
        print("Sending NewNumber!")
        socketio.emit('newnumber', randint(1, 100), namespace='/random')
        socketio.sleep(0.5);


@app.route('/random')
def random():
    return render_template('random_number.html')

if __name__ == "__main__":
    socketio.run(app, host=os.getenv('IP', '0.0.0.0'), port =int(os.getenv('PORT', 8080)), debug=True)
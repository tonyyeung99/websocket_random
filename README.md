# websocket_random

Submission the solution of the random numbers generation Web Application

[Demo URL]
http://tonyfalcon.mynetgear.com:8888/

[Assumption & Limitation]
1.  The random number generated range from 1 ~ 100
2.  If number is larger than or equal to 80, the color of the cell will change to red
3.  If number is smaller than or equal to 20, the color of the cell will change to green
4.  The rendering interval in the UI is fixed at 2000 ms, i.e. render every 2000 ms
5.  User could not set the frequency of the server generating numbers too slow.(i.e. The interval could not larger than 10 second)

[Technolgies Used]
Frontend:
-SPA(Single Page Application)
-Websockets Client
-MVVM Model
-Custom Directive
-Asynchronous Programming

Backend:
-Websocket Server
-Routing
-Asynchronous Event

[Framework]
Frontend:
-AngularJS
-CSS Stylesheet
Backend:
-Flask
-Flask-SocketIO

[Installing Dependencies]
pip install -r requirements.txt

[Running the Server]
python random_viewer.py

[Running the Client]
Open the URL: http://127.0.0.1:8888/

[To Do List]
- Add Auto-testing Cases
- Add the features of settable threshold values for displaying "Red" or "Green" color cells

from flask import Flask, render_template
from flask_socketio import SocketIO
import numpy as np
from PIL import Image
import sys
sys.path.insert(1, '../algorithms')
from feature_extractor import FeatureExtractor
import mysql.connector


app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
socketio = SocketIO(app)


cnx = mysql.connector.connect(
    host="139.177.182.18",
    port=3306,
    user="node",
    password="Password1!",
    db="peDatabase")
mysqlQuery = cnx.cursor()
mysqlQuery.execute("SELECT pePhotos.* FROM pePhotos WHERE idPhoto < 1765");

fe = FeatureExtractor()
features = []
images = []
for image in mysqlQuery.fetchall():
    print(image[7])
    features.append(np.load(image[7]))
    images.append(image[1])
features = np.array(features)
cnx.close()

def createJSON(data):
    obj = '{' + ', '.join('"{}": {}'.format(v, k) for k, v in data) + '}'
    return obj

@app.route('/')
def sessions():
    return render_template('session.html')

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('reverse-search')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('Recieved image id: ' + str(json)+" for reverse search")
    imgDB = Image.open("../../api/"+str(json)) 
    query = fe.extract(imgDB)
    dists = np.linalg.norm(features-query, axis=1)  # L2 distances to features
    ids = np.argsort(dists)[:30]  # Top 30 results
    scores = [(dists[id], images[id]) for id in ids]
    print(str(createJSON(scores)))
    socketio.emit('reverse-search-response', str(createJSON(scores)), callback=messageReceived)

if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=3001)
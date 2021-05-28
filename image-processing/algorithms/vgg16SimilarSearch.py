import mysql.connector
import cv2
from PIL import Image
from feature_extractor import FeatureExtractor
from pathlib import Path
import numpy as np
import ssl
import json
#ssl._create_default_https_context = ssl._create_unverified_context

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



mysqlQuery.execute("SELECT pePhotos.* FROM pePhotos WHERE idPhoto = %s", (1725,));
imageDb=mysqlQuery.fetchone()
imgDB = Image.open("../../api/test-file/"+imageDb[1]) 
query = fe.extract(imgDB)
dists = np.linalg.norm(features-query, axis=1)  # L2 distances to features
ids = np.argsort(dists)[:30]  # Top 30 results
scores = [(dists[id], images[id]) for id in ids]
print(json.dumps(str(scores)))

cnx.close()
"""
img = Image.open("../../api/test-file/adler-6194438_150.jpg") 
query = fe.extract(img)
dists = np.linalg.norm(features-query, axis=1)  # L2 distances to features
ids = np.argsort(dists)[:30]  # Top 30 results
scores = [(dists[id], images[id]) for id in ids]
    #feature = fe.extract(img=Image.open(image_path))
    #feature_path = Path("../vgg16-features") / (image[1] + ".npy")  # e.g., ./static/feature/xxx.npy
    #np.save(feature_path, feature)
    ##sql = "UPDATE pePhotos SET vgg16Features = %s WHERE idPhoto = %s"
    #val = ("../vgg16-features"+image[1] + ".npy", image[0])
    #mysqlQuery.execute(sql, val)
    #cnx.commit()
"""

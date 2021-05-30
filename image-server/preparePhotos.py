from PIL import Image
from feature_extractor import FeatureExtractor
from pathlib import Path
import numpy as np
import ssl
import mysql.connector

ssl._create_default_https_context = ssl._create_unverified_context

cnx = mysql.connector.connect(
    host="139.177.182.18",
    port=3306,
    user="node",
    password="Password1!",
    db="peDatabase")
mysqlQuery = cnx.cursor()

mysqlQuery.execute("SELECT pePhotos.* FROM pePhotos");

fe = FeatureExtractor()

for image in mysqlQuery.fetchall():
    image_path="../api/test-file/"+image[1]
    feature = fe.extract(img=Image.open(image_path))
    feature_path = Path("./vgg16-features") / (image[1] + ".npy")  # e.g., ./static/feature/xxx.npy
    np.save(feature_path, feature)
    sql = "UPDATE pePhotos SET vgg16Features = %s WHERE idPhoto = %s"
    val = ("./vgg16-features/"+image[1] + ".npy", image[0])
    mysqlQuery.execute(sql, val)
    cnx.commit()


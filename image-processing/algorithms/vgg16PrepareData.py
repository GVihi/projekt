import mysql.connector
import cv2
from PIL import Image
from feature_extractor import FeatureExtractor
from pathlib import Path
import numpy as np
import ssl

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
    image_path="../../api/test-file/"+image[1]
    feature = fe.extract(img=Image.open(image_path))
    feature_path = Path("../vgg16-features") / (image[1] + ".npy")  # e.g., ./static/feature/xxx.npy
    np.save(feature_path, feature)
    sql = "UPDATE pePhotos SET vgg16Features = %s WHERE idPhoto = %s"
    val = ("../vgg16-features/"+image[1] + ".npy", image[0])
    mysqlQuery.execute(sql, val)
    cnx.commit()

"""
cnx = mysql.connector.connect(
    host="139.177.182.18",
    port=3306,
    user="node",
    password="Password1!",
    db="peDatabase")
mysqlQuery = cnx.cursor()



def saveKeypointsToDatabase(keypoints, imgId,imgName,mysqlQuery):
    
    f = open("../images-keypoints/kps-"+imgName+".bin", "wb")
    f.write(cPickle.dumps(index))
    f.close()
    sql = "UPDATE pePhotos SET vgg16Features = %s WHERE idPhoto = %s"
    val = ("vgg-"+imgName+".bin", imgId)
    mysqlQuery.execute(sql, val)
    cnx.commit()
    return 0;


mysqlQuery.execute("SELECT * FROM peTags")
tags = []
for tag in mysqlQuery.fetchall():
    tags.append(tag)
   
#print(tags[0][0])

for i in range(0, len(tags)):
    print(tags[i][1])
    mysqlQuery.execute("SELECT pePhotos.* FROM pePhotos JOIN pePhotoTags ON pePhotos.idPhoto = pePhotoTags.photoId JOIN peTags ON peTags.idTag = pePhotoTags.tagId WHERE peTags.idTag=%s", (tags[i][0],));
    tagImages = []
    for image in mysqlQuery.fetchall():
        tagImages.append(image)
    print(tagImages)

mysqlQuery.execute("SELECT pePhotos.* FROM pePhotos JOIN pePhotoTags ON pePhotos.idPhoto = pePhotoTags.photoId JOIN peTags ON peTags.idTag = pePhotoTags.tagId WHERE peTags.idTag=%s", (tags[4][0],));


sift = cv2.SIFT_create();

for image in mysqlQuery.fetchall():
    img=cv2.imread("../../api/test-file/"+image[1])
    keypoints,descriptors=computeKeypoints(img,sift)
    saveKeypointsToDatabase(keypoints,image[0], image[1],mysqlQuery)
    print(image[0])


cnx.close()

"""
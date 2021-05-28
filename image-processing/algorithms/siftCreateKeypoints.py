import mysql.connector
import cv2
import _pickle as cPickle
import numpy as np

cnx = mysql.connector.connect(
    host="139.177.182.18",
    port=3306,
    user="node",
    password="Password1!",
    db="peDatabase")
mysqlQuery = cnx.cursor()


def computeKeypoints(img, sift):
    keypoints,descriptors=sift.detectAndCompute(img, None)
    return keypoints, descriptors


def saveDescriptorsToDatabase(descriptors, imgId,imgName,mysqlQuery):
    f = open("../images-descriptors/descp-"+imgName+".bin", "wb")
    f.write(cPickle.dumps(descriptors))
    f.close()
    sql = "UPDATE pePhotos SET descriptorsFile = %s WHERE idPhoto = %s"
    val = ("descp-"+imgName+".bin", imgId)
    mysqlQuery.execute(sql, val)
    cnx.commit()
    return 0;

def saveKeypointsToDatabase(keypoints, imgId,imgName,mysqlQuery):
    index = []
    for point in keypoints:
        temp = (point.pt, point.size, point.angle, point.response, point.octave, 
            point.class_id) 
        index.append(temp)
    f = open("../images-keypoints/kps-"+imgName+".bin", "wb")
    f.write(cPickle.dumps(index))
    f.close()
    sql = "UPDATE pePhotos SET keypointsFile = %s WHERE idPhoto = %s"
    val = ("kps-"+imgName+".bin", imgId)
    mysqlQuery.execute(sql, val)
    cnx.commit()
    return 0;


mysqlQuery.execute("SELECT * FROM peTags")
tags = []
for tag in mysqlQuery.fetchall():
    tags.append(tag)
   
#print(tags[0][0])
"""
for i in range(0, len(tags)):
    print(tags[i][1])
    mysqlQuery.execute("SELECT pePhotos.* FROM pePhotos JOIN pePhotoTags ON pePhotos.idPhoto = pePhotoTags.photoId JOIN peTags ON peTags.idTag = pePhotoTags.tagId WHERE peTags.idTag=%s", (tags[i][0],));
    tagImages = []
    for image in mysqlQuery.fetchall():
        tagImages.append(image)
    print(tagImages)
"""
mysqlQuery.execute("SELECT pePhotos.* FROM pePhotos JOIN pePhotoTags ON pePhotos.idPhoto = pePhotoTags.photoId JOIN peTags ON peTags.idTag = pePhotoTags.tagId WHERE peTags.idTag=%s", (tags[4][0],));


sift = cv2.SIFT_create();

for image in mysqlQuery.fetchall():
    img=cv2.imread("../../api/test-file/"+image[1])
    keypoints,descriptors=computeKeypoints(img,sift)
    print(descriptors)
    saveKeypointsToDatabase(keypoints,image[0], image[1],mysqlQuery)
    saveDescriptorsToDatabase(descriptors,image[0], image[1],mysqlQuery)
    print(image[0])


cnx.close()


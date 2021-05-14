import cv2
 
src = cv2.imread('/home/projekt/api/uploads/2021-05-09T13:01:00.003Zphoto-1473210630848-e12656228f26.jpg', cv2.IMREAD_UNCHANGED)

new_width = 300

# dsize
dsize = (new_width, src.shape[0])

# resize image
output = cv2.resize(src, dsize, interpolation = cv2.INTER_AREA)

cv2.imwrite('./../proccessed-images/new.png',output) 

print("dataToSendBack")
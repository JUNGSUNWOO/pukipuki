import sys
#url = sys.argv[1]
# if url == 'vedio_url':
#    print('yes')
# print('success')
import cv2
import time
import numpy as np
MODE = "COCO"
if MODE == "COCO":
    protoFile = "C:/Users/spide/PycharmProjects/oasis_jsw/openpose-master/models/pose/coco/pose_deploy_linevec.prototxt"
    weightsFile = "C:/Users/spide/PycharmProjects/oasis_jsw/openpose-master/models/pose/coco/pose_iter_440000.caffemodel"
    nPoints = 18
    POSE_PAIRS = [ [1,0],[1,2],[1,5],[2,3],[3,4],[5,6],[6,7],[1,8],[8,9],[9,10],[1,11],[11,12],[12,13],[0,14],[0,15],[14,16],[15,17]]
elif MODE == "MPI" :
    protoFile = "C:/Users/spide/PycharmProjects/oasis_jsw/openpose-master/models/pose/mpi/pose_deploy_linevec_faster_4_stages.prototxt"
    weightsFile = "C:/Users/spide/PycharmProjects/oasis_jsw/openpose-master/models/pose/mpi/pose_iter_160000.caffemodel"
    nPoints = 15
    POSE_PAIRS = [[0,1], [1,2], [2,3], [3,4], [1,5], [5,6], [6,7], [1,14], [14,8], [8,9], [9,10], [14,11], [11,12], [12,13] ]
inWidth = 368
inHeight = 368
threshold = 0.1
# input_source = "../video/httpswwwyoutubecomwatchv=UNy3zEPYNo4.mp4"
# input_source '= "./data/sample"
input_source = "C:/Users/spide/PycharmProjects/oasis_jsw/video/data/sample.mp4" #video 경로
write_video_path = "C:/Users/spide/PycharmProjects/oasis_jsw/video/data/sample22.avi" #video 저장될 경로
# cap = cv2.VideoCapture(input_source + '.mp4')
print("get video")
cap = cv2.VideoCapture(input_source)
hasFrame, frame = cap.read()
fps = cap.get(cv2.CAP_PROP_FPS)
vid_writer = cv2.VideoWriter(write_video_path, cv2.VideoWriter_fourcc('M','J','P','G'), fps, (frame.shape[1],frame.shape[0]))
print("net init")
net = cv2.dnn.readNetFromCaffe(protoFile, weightsFile)
all_points = {}
while cv2.waitKey(1) < 0:
    t = time.time()
    hasFrame, frame = cap.read()
    frameCopy = np.copy(frame)
    if not hasFrame:
        cv2.waitKey()
        break
    frameWidth = frame.shape[1]
    frameHeight = frame.shape[0]
    inpBlob = cv2.dnn.blobFromImage(frame, 1.0 / 255, (inWidth, inHeight),
                              (0, 0, 0), swapRB=False, crop=False)
    net.setInput(inpBlob)
    output = net.forward()
    H = output.shape[2]
    W = output.shape[3]
    # Empty list to store the detected keypoints
    points = []
    for i in range(nPoints):
        # confidence map of corresponding body's part.
        probMap = output[0, i, :, :]
        # Find global maxima of the probMap.
        minVal, prob, minLoc, point = cv2.minMaxLoc(probMap)
        # Scale the point to fit on the original image
        x = (frameWidth * point[0]) / W
        y = (frameHeight * point[1]) / H
        if prob > threshold :
            cv2.circle(frameCopy, (int(x), int(y)), 8, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            cv2.putText(frameCopy, "{}".format(i), (int(x), int(y)), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2, lineType=cv2.LINE_AA)
            # Add the point to the list if the probability is greater than the threshold
            points.append((int(x), int(y)))
        else :
            points.append(None)
    if int(cap.get(cv2.CAP_PROP_POS_MSEC) % 1000) == 0:
        print(points)
        all_points[cap.get(cv2.CAP_PROP_POS_MSEC)] = points
    # Draw Skeleton
    for pair in POSE_PAIRS:
        partA = pair[0]
        partB = pair[1]
        if points[partA] and points[partB]:
            cv2.line(frame, points[partA], points[partB], (0, 255, 255), 2, lineType=cv2.LINE_AA)
            cv2.circle(frame, points[partA], 3, (0, 0, 255), thickness=-1, lineType=cv2.FILLED)
            cv2.circle(frame, points[partB], 3, (0, 0, 255), thickness=-1, lineType=cv2.FILLED)
    # cv2.putText(frame, "time taken = {:.2f} sec".format(time.time() - t), (50, 50), cv2.FONT_HERSHEY_COMPLEX, .8, (255, 50, 0), 2, lineType=cv2.LINE_AA)
    # cv2.putText(frame, "OpenPose using OpenCV", (50, 50), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 50, 0), 2, lineType=cv2.LINE_AA)
    # cv2.imshow('Output-Keypoints', frameCopy)
    #cv2.imshow('Output-Skeleton', frame)
    vid_writer.write(frame)
vid_writer.release()
print("done")
import json
with open(input_source+".json", "wt") as json_file:
    json.dump(all_points, json_file)

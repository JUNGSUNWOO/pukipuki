import numpy as np
import math

def vectorize(input):
    vector = np.zeros((13,2))
    count =0
    for i in range(2):
        # vector[0][i] = input[0][i] - input[1][i]
        # vector[1][i] = input[1][i] - input[2][i]
        # vector[2][i] = input[1][i] - input[5][i]
        # vector[3][i] = input[2][i] - input[3][i]
        # vector[4][i] = input[3][i] - input[4][i]
        # vector[5][i] = input[5][i] - input[6][i]
        # vector[6][i] = input[6][i] - input[7][i]
        # vector[7][i] = input[1][i] - input[8][i]
        # vector[8][i] = input[1][i] - input[11][i]
        # vector[9][i] = input[8][i] - input[9][i]
        # vector[10][i] = input[9][i] - input[10][i]
        # vector[11][i] = input[11][i] - input[12][i]
        # vector[12][i] = input[12][i] - input[13][i]
        vector[0][i] = vectorf(input[0][i],input[1][i])
        vector[1][i] = vectorf(input[1][i], input[2][i])
        vector[2][i] = vectorf(input[1][i], input[5][i])
        vector[3][i] = vectorf(input[2][i], input[3][i])
        vector[4][i] = vectorf(input[3][i], input[4][i])
        vector[5][i] = vectorf(input[5][i], input[6][i])
        vector[6][i] = vectorf(input[6][i], input[7][i])
        vector[7][i] = vectorf(input[1][i], input[8][i])
        vector[8][i] = vectorf(input[1][i], input[11][i])
        vector[9][i] = vectorf(input[8][i], input[9][i])
        vector[10][i] = vectorf(input[9][i], input[10][i])
        vector[11][i] = vectorf(input[11][i], input[12][i])
        vector[12][i] = vectorf(input[12][i], input[13][i])

    v_hat = np.zeros((13,2))
    for i in range(0,13):
        # if np.isnan(v_hat[i][0]):
        #     print("ss")
        v_hat[i][0] = vector[i][0] / math.sqrt(math.pow(vector[i][0],2)+math.pow(vector[i][1],2))
        v_hat[i][1] = vector[i][1] / math.sqrt(math.pow(vector[i][0],2)+math.pow(vector[i][1],2))
    #print(vector[5])
    #v_hat = vector/np.linalg.norm(vector)
    # print(v_hat)
    # print(count)
    for i in range(0,13):
        if np.isnan(v_hat[i][0]):
            count = count +1
            #print(count)



    return v_hat

def vectorf(a,b):
    if a is None:
        return None
    if b is None:
        return None
    return a-b



def similarity(a,b):
    sum = 0
    error =0
    cnt =0
    for i in range(0,13):
        if np.isnan(a[i][0]) or np.isnan(b[i][0]):
            cnt +=1
            error +=1
        else:
            tmp= math.pow((a[i][0] - b[i][0]),2) + math.pow((a[i][1] - b[i][1]),2)
            sum += math.sqrt(tmp)
            if math.sqrt(tmp)>0.5:
                error +=1
            # print(math.sqrt(tmp))
    cnt = 13-cnt

    return sum/cnt,error




list0 = [(400, 69), (400, 173), (313, 173), (243, 243), (243, 330), (486, 173),
         (539, 260), (539, 347), (347, 400), (347, 556), (347, 730), (452, 400), (452, 556), (452, 730), (382, 52), (417, 52), (365, 69), (434, 69), (765, 17)]
list1=[(246, 46), (258, 105), (211, 117), (211, 187), (211, 257), (305, 105),
       (328, 175), (328, 246), (234, 257), (246, 374), (258, 480), (293, 257), (293, 374), (293, 468), (234, 46), (258, 35), (223, 58), (270, 46), (528, 527)]
list2 = [(473, 417), (494, 495), (430, 495), (387, 600), (430, 652), (537, 495),
         (580, 573), (537, 652), (451, 678), (408, 834), (473, 939), (516, 678), (516, 808), (494, 939), (473, 391), (494, 391), (451, 417), (516, 417), (946, 1121)]
list3 = [(333, 55), (347, 125), (306, 125), (292, 222), (236,140), (389, 111),
         (431, 194), (389, 236), (306, 278), (236, 403), (210,598), (375, 292), (375, 445), (375, 598), (333, 41), (347, 41), (306, 55), (361, 41), (612, 598)]
list4 = [(200, 95), (200, 130), (156, 121), (121, 121), (86, 104), (244, 121),
         (279,121), (304, 95), (182, 217), (165, 295), (173, 365), (208, 217), (200, 304), (191, 373), (191, 95), (191, 95), (182, 95), (10,10), (8, 373)]
list5 = [(200, 95), (None,None), (156, 121), (121, 121), (86, 104), (244, 121),
         (279,121), (304, 95), (182, 217), (165, 295), (173, 365), (208, 217), (200, 304), (191, 373), (191, 95), (191, 95), (182, 95), (10,10), (8, 373)]


input0 = np.array(list0)
input1 = np.array(list1)
input2 = np.array(list2)
input3 = np.array(list3)
input4 = np.array(list4)
input5 = np.array(list5)
# print(vectorize(input0))
# print(vectorize(input1))

vector0 = vectorize(input0)
vector1 = vectorize(input1)
vector2 = vectorize(input2)
vector3 = vectorize(input3)
vector4 = vectorize(input4)
vector5 = vectorize(input5)

print(similarity(vector0,vector1))
print("\n\n")
print(similarity(vector0,vector2))
print("\n\n")
print(similarity(vector0,vector3))
print("\n\n")
print(similarity(vector0,vector4))
print(similarity(vector0,vector5))


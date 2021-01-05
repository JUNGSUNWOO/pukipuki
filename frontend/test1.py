import sys
#print('python achieve')
#print(sys.argv[1])
url = sys.argv[1]
print(url)
#from pytube import YouTube
path = "../video/"
def get_video():
    video = YouTube(url)
    print(video.streams.filter(progressive=True, file_extension="mp4"))
    video.streams.filter(progressive=True, file_extension="mp4")\
    .order_by('resolution').desc().first().download(filename=url, output_path=path)
#get_video()
print('success')
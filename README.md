# ozflix
Video Streaming service built in NodeJS

## TODO

- add form to add new movies
- add basic auth for admin
- add routes for series
- create a cinema feature (live streaming)
- add delete and update forms
- improve page style
- change schema to include image
- optimize video files for streaming 
- configure nginx and process manager
- find a better way to manipulate routes

## Notes

To optimize the videos im using ffmpeg

the frame rate is set between 700K and 1M, for this case, since i didnt have too much
disk space im priorizing quantity over quality. 

`ffmpeg -i sample.mp4 -vf scale=-1:720 -vcodec libvpx-vp9 -b:v 700K -acodec libvorbis test.webm`

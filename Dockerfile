FROM busybox
COPY /. /data
CMD ["cp", "-R", "/data/.", "/shared-volume/2048"]

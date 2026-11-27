FROM jekyll/jekyll:latest
ADD . /srv/jekyll
CMD ["jekyll","serve"]

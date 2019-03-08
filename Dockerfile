FROM node:6.5.0

ENV HOME=/home/pokedeck

WORKDIR $HOME 
COPY . $HOME 
RUN cd $HOME; npm install nodemon -g; npm install
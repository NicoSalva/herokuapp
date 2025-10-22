FROM node:20-bullseye

# Install Firefox and dependencies
RUN apt-get update && apt-get install -y \
    firefox-esr \
    xvfb \
    x11vnc \
    fluxbox \
    wmctrl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Set display for Firefox
ENV DISPLAY=:99

# Start virtual display and run tests with new unified config
CMD xvfb-run -a --server-args="-screen 0 1920x1080x24" npm run test

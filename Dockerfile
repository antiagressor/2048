FROM nginx:alpine

# Remove the default NGINX website
RUN rm -rf /usr/share/nginx/html/*

# Copy only the necessary files and directories
COPY src /usr/share/nginx/html

# Expose port 80
EXPOSE 80


FROM prom/prometheus:latest

# copy the prometheus.yml file from local machine to the workdir in container
COPY prometheus.yml /etc/prometheus/prometheus.yml

# expose the port that prometheus is running on
EXPOSE 9090
FROM grafana/grafana:latest

COPY grafana.ini /etc/grafana/grafana.ini
COPY provisioning /etc/grafana/provisioning

EXPOSE 3000

CMD ["grafana-server"]

FROM postgres:latest

ENV POSTGRES_DB=sign_db
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=test

COPY pg_hba.conf /etc/postgresql/pg_hba.conf

# Add a custom entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["postgres"]

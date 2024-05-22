# Use an official PostgreSQL image
FROM postgres:latest

# Set environment variables
ENV POSTGRES_DB=sign_metadata
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=test

# Add the alias to the .bashrc file
RUN echo "alias db='psql -d $POSTGRES_DB -U $POSTGRES_USER'" >> /root/.bashrc

# Expose PostgreSQL port
EXPOSE 5432

#!/bin/bash
set -e

# Copy the custom pg_hba.conf to the correct location
cp /etc/postgresql/pg_hba.conf /var/lib/postgresql/data/pg_hba.conf

# Call the original entrypoint script
exec docker-entrypoint.sh "$@"

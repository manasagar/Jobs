FROM --platform=linux/amd64 openjdk:17-jdk-slim as build
WORKDIR /app
COPY target/restservices-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
# ENV SPRING_MAIL_PASSWORD="hhkg vurj knwn rjyp"
# ENV ZOOM_ACCOUNT_ID="XMaIW6dpT0inR7K-f0_9tA"
# ENV SPRING_MAIL_USERNAME="manasdev1221@gmail.com"
# ENV ZOOM_CLIENT_ID="qC30_iayR22rWpSXuogg"
# ENV ZOOM_CLIENT_SECRET="ELF4PLCxfVHeApAa681puSgZ6c8lML5F"
ENTRYPOINT ["java", "-jar", "app.jar"]

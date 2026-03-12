pipeline {
    agent any

    environment {
        IMAGE_NAME = "trash-fe-image"
        CONTAINER_NAME = "trash-fe"
        FE_WEB_ROOT = "${env.FE_WEB_ROOT}"
        FE_WEB_NGINX_PORT = "${env.FE_WEB_NGINX_PORT}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Depoloy') {
            when {
                branch 'develop'
            }

            steps {
                sh """
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p ${FE_WEB_NGINX_PORT}:80 ${IMAGE_NAME}:latest
                """
            }
        }
    }

    post {
        always {
            sh "docker image prune -f"
        }
    }
}
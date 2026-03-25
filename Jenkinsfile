pipeline {
    agent any

    environment {
        IMAGE_NAME = "trash-fe-image"
        CONTAINER_NAME = "trash-fe"
        FE_WEB_NGINX_PORT = "${env.FE_WEB_NGINX_PORT}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Pre Build') {
            steps {
                withCredentials([file(credentialsId: 'fe-env', variable: 'ENV_FILE_PATH')]) {
                    script {
                        sh "cp ${ENV_FILE_PATH} .env"
                    }
                }
            }
        }
        stage('Build') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Deploy') {
            when {
                branch 'develop'
            }
            
            steps {
                sh "docker compose up -d --remove-orphans"
            }
        }
    }

    post {
        always {
            sh "docker image prune -f"
        }
    }
}
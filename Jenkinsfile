pipeline {
  agent any

  stages {

    stage('Clone') {
      steps {
        git 'https://github.com/KumarPawan2004/Full-Deployment-set.git'
      }
    }

    stage('Build Images') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Run Containers') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up -d'
      }
    }
  }
}
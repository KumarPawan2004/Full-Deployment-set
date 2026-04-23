pipeline {
  agent any

  stages {

    stage('Build Images') {
      steps {
        sh 'docker compose build'
      }
    }

    stage('Run Containers') {
      steps {
        sh 'docker compose up -d --build'
      }
    }
  }
}
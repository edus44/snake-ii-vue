pipeline {
    agent {
        docker {
            image 'node:12-alpine' 
        }
    }
    stages {
        stage('Install deps') { 
            steps {
                sh 'yarn install' 
            }
        }
    }
}
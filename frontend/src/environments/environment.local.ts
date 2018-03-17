export const environment = {
  production: true,
  baseDomainUrl: 'localhost:4200',
  dexieDatabase: 'pathofchild_dev',
  apollo: {
    url: 'http://localhost:4001/graphql'
  },
  auth0: {
    clientID: 'M4LzkncD47rqZbXMa4q7V09JxhEtNYH3',
    domain: 'pathofchild.eu.auth0.com',
    options: {
      auth: {
        redirectUrl: 'http://localhost:4200/security/callback',
        responseType: 'token id_token',
        params: {
          scope: 'openid email'
        }
      }
    }
  }
};

import React from 'react';
import forge from 'node-forge';
import NodeRSA from 'node-rsa';
import crypto from 'crypto'
import fs from 'fs';
const handleGenerateKeys = async () => {
    try {
      // Generate a new key pair
      // const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

      // const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
      // const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

      
      const keyPair = forge.pki.rsa.generateKeyPair(2048);
      
      // Export the public key and private key in PEM format
      const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
      const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);
      
      // console.log('Public Key:');
      // console.log(publicKeyPem);
      // console.log('Private Key:');
      // console.log(privateKeyPem);
      
      // Data to encrypt
      // const originalData = 'Hello, world!';
      
      // Encrypt the data using the public key
      return [publicKeyPem,privateKeyPem];
      
    } catch (error) {
      console.error('Key generation error:', error);
    }
  };
  
  const handleEncrypt = async (dataToHash,publicKeyPem) => {
    try {

      const encryptedData = forge.pki.publicKeyFromPem(publicKeyPem).encrypt(dataToHash, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
      });
      
      // console.log('Encrypted Data:');
      // console.log(encryptedData.toString('base64'));
      const encryptedDataB64 = forge.util.encode64(encryptedData);
      // console.log('Encrypted Data 64:');
      // console.log(encryptedDataB64);
      return encryptedDataB64;
    } catch (error) {
        console.error('Encryption error:', error);
    }
  };

const handleDecrypt = async (encrypted,privateKeyPem) => {
try {

      // console.log("do this",privateKeyPem);
      // console.log("do this",encrypted);
      // privateKeyPem = "-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEAoIoTXIpW9swrW8yOWzBPUF0HPtY0umPhOSulHRpAlIv3vc8cuIK0nrTdY8gkCpTjItdQe6W3WVZW8FGmiktuCPYMlmhYEkAbvp9NWZWOWVa7kuh6QFgRmKK4G8ggbETeYdMYPVzZP0uIXsoAzdHtMR76jX43P1I2qC3VJy4P8rPjM/Zhi/c4qXCjJ3QTh3OMBdea6YKdzt1nloR//X4TR8U2GZeMj0c1HrrnczTEYO+8FR8ejstXN/2jcD/Oc3F5XMwKjpIvtk+WM+oVIwOn7eJiuNH4Kfm2r68DACXPWoLkFYlYZPn/AMDF6odY5JLpc6YK0zTJshJ00uw5cBN12QIDAQABAoIBABESPbbUeyTpVx7+5JBr1bNNAS08aAT+BAApVPiARyfEroZ/lKVGOOC7iONIcBSz+mdFECjl2VZlqP8LH7OLC9tmFraTx/HA4XJmzDnffnCfmXiowf8/njdl7j/+CvyYYjFy2hwEWJGzfX/e6TD5xsg3bBtJtaRFIMzHeugcrNN5BALvWXNldeS5wScY4hER78YmpQO6NL8cUrgyiySrvGmLB/dKXADimfN+EnMdP5kmF+c1tVpMhTWnfeFIgnaJYLpZfLJd09weVBmw7p28Do2Vn6pDg+yAT2G1qlWPu6NHZ5kUPvp7f5itTuoUh5Vqjp4CrL3yb5FshRsM7YzlOAECgYEA6O2yIyh/DO951N0ZU64rx9DT+XmPJ1/tDqTcDSS3lhRyf+VrkdT57Fb4P+9xyZ3tX912MudI8TCSO75i18qG/ADl7RlR0gUFzrXjmKvKk7ngk/+xj8AqOI7DIrHxJWUTMOnzRC2nqqycPTPBA9ZygkKOydXFcrPJMW0Z1lCDkNkCgYEAsHDUAb/4GuU2i0GS34Po/4eKVBktTStYdUiZFMyxuzKJDzxHMEbvQEEqbip43FTRdxh8oqBsoh6cGEit180tqqmCmcWIbhPy9/GgWqVWFpqiuwBGIHzBuMFpNhuoONqebiEMnimjlRWf8F0EWg2SBTzfK4OxCciKe8zlgOvP7QECgYAZxIHaZdZ4Rd3CcJsmqLPrLOzmQk5V2sTMw+wcAB3XGnf4MhcOUPM88/oOiJyb4z6pRkSXKQLmu6rRtSQWHy+DnU3SRuTISQn1biW5c/e7E+sGNFkeP/Hrw89OfUTiECZpWNgyiKJtvR6jnqARnp2YT2igZ2eqYr01HI6pKMsFMQKBgQCUInZs7a6xbgYoTqqwTECf4T1LNEQriRvghE45/02tHFWkW/hs2PFgIhYsni4Q1olykzV5GHV8e3SUktiZ2WLg6SaEUiskOE2Cy/PUhwHLQpMjq6w09Gl047WgvwGykiH31nmQhOcZcSlyFbZkoQYarau1DgDidOOH41RAtDtDAQKBgBW6x7tVPUu/uSZQC2d3+W9tOurwIwce6DyNLzTPpu9aNeyjcDdL5hX/21eTepmSJAK8UgIJFDs/H4zE/cKi8gmNdg9wTY7hULjnaLz0SeNqIx/h1vQbKRafXPY+b8ruUrMbPUP2AXEeK6FDe1J2eAb03PpnCBVcSbTZJXDt3DrG-----END RSA PRIVATE KEY-----"
      const decodedData = forge.util.decode64(encrypted);
      // Decrypt the data using the private key
      console.log(decodedData);
      const decryptedData = forge.pki.privateKeyFromPem(privateKeyPem).decrypt(decodedData, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
      });
    
      return decryptedData;

} catch (error) {
    console.error('Encryption error:', error);
}
};

const keys = await handleGenerateKeys();
const publicKey = keys[0];
const privateKey = keys[1];
// console.log((privateKey));
// const privateKeyFilePath = 'privateKey.txt'; // Replace with your file path
// const privateKey = fs.readFileSync(privateKeyFilePath, 'utf8');

// const publicKey = "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxF7RjN6R5qm5OS2IxYe0GySV9+ScIBGleRgysdzuo85L7NKIit9xPc4hMPPhqH+WLtwzXCG8gdDWc7vJTHtCSfDX5uV93rsmbq6aOw+qM9atlMnRVlX7VgQh1IQ91Cu4ROPDe27lKF8Ft4YqLpAFdNq1ksCvgEElSJ5Yo//xThHBhbYbsPsLxpNCiV8v/w8NRDqlIeQL4uy0s4LhGZMyIpfOPOZmNgpF014bjG4x/geSVZNHpC28qOsVsskJvQY66jSXIbGXgeuL9bOmdcI3TEQbXHgubuPzt9uU6mz8y7mu/VG19/U7p2wyszXUcBvlYhrFs25skyzhFjcSVQiNLQIDAQAB\r\n-----END PUBLIC KEY-----\r\n";
// // const privateKey = "

// const encodedData = await handleEncrypt("patient3@gmail.com",publicKey);
// console.log("hashed = ",encodedData);
// // console.log();
// const decodedData = await handleDecrypt(encodedData,privateKey);
// console.log("original = ",decodedData);




export{
    handleGenerateKeys,handleEncrypt,handleDecrypt
}
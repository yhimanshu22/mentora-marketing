import crypto from 'crypto';
import { config } from '../config.js';

export const PAYU_URLS = {
  sandbox: 'https://test.payu.in/_payment',
  production: 'https://secure.payu.in/_payment',
};

export function getPayUActionUrl(): string {
  return config.payuEnv === 'production' ? PAYU_URLS.production : PAYU_URLS.sandbox;
}

interface PayUHashParams {
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

export function generatePayUHash(params: PayUHashParams): string {
  const key = config.payuMerchantKey;
  const salt = config.payuMerchantSalt;

  const udf1 = params.udf1 ?? '';
  const udf2 = params.udf2 ?? '';
  const udf3 = params.udf3 ?? '';
  const udf4 = params.udf4 ?? '';
  const udf5 = params.udf5 ?? '';

  // Formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
  const hashString = `${key}|${params.txnid}|${params.amount}|${params.productinfo}|${params.firstname}|${params.email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;
  
  return crypto.createHash('sha512').update(hashString).digest('hex');
}

interface PayUCallbackParams {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  status: string;
  hash: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

export function verifyPayUHash(params: PayUCallbackParams): boolean {
  const salt = config.payuMerchantSalt;

  const udf1 = params.udf1 ?? '';
  const udf2 = params.udf2 ?? '';
  const udf3 = params.udf3 ?? '';
  const udf4 = params.udf4 ?? '';
  const udf5 = params.udf5 ?? '';

  // Formula: sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
  const hashString = `${salt}|${params.status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${params.email}|${params.firstname}|${params.productinfo}|${params.amount}|${params.txnid}|${params.key}`;
  
  const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');
  return calculatedHash.toLowerCase() === params.hash.toLowerCase();
}

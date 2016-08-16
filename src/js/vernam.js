"use strict";

class Converter {
    constructor(alphabet) {
        this.alphabet = alphabet;
    }

    find(char) {
        for (var i = 0; i < this.alphabet.length; i++) {
            if (char === alphabet[i]) {
                return i;
            }
        }
        return -1;
    }

    toChar(i) {
        //TODO: test and fix negative values
        return this.alphabet[i % this.alphabet.length];
    }
}

let converter = new Converter(require('./cryptic'));

let xor = function (left, right) {
    return left ^ right;
};

/**
 * {
 *  reversible: boolean — makes algorithm reversible
 * }
 * @param options
 * @returns {{encrypt: encrypt, decrypt: decrypt}}
 */
module.exports = function (options) {
    return {
        encrypt: function (text, secret) {
            let cipher = [];
            for (var i = 0; i < text.length; i++) {
                var result = xor(text.charCodeAt(i), secret.charCodeAt(i % secret.length));
                cipher.push(converter.toChar(result));
            }
            return cipher.join('');
        },

        //TODO: are not reversible at the moment
        decrypt: function (cipher, secret) {
            let plain = [];
            for (var i = 0; i < cipher.length; i++) {
                var result = xor(converter.find(cipher[i]), converter.find(secret[i % secret.length]));
                plain.push(String.fromCharCode(result));
            }
            return plain;
        }
    }
};
import jwt from 'jsonwebtoken';

export function useJwtAuth(privateKey: string) {
	function genToken(payload = {}, options?: jwt.SignOptions) {
		return jwt.sign(payload, privateKey, {
			algorithm: 'HS256',
			...(options ?? {})
		});
	}

	function decodeToken(token: string) {
		return jwt.decode(token);
	}

	function verifyToken(token: string) {
		return jwt.verify(token, privateKey);
	}

	return {
		genToken,
		decodeToken,
		verifyToken
	};
}

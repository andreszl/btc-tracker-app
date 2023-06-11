export interface IBTC {
	_id: { S: string },
	price: { N: string } ,
	created_at: { S: string } ,
}

export interface IGetTrackerResponse {
	body: string,
	statusCode: number
}
export interface IConfiguration<Body = {}> {
	method?: string,
	host?: string,
	url: string,
	headers?: any,
	body?: Body,
}

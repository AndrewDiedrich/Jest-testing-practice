const fetch = require('node-fetch');
const swapi = require('./script2');


// it('calls swapi to get people', (done) => { //for async - jest wait till to pass test until it callbacks done
// 	expect.assertions(1) //expect the number of assertions like expect 
// 	swapi.getPeople(fetch).then(data => { //test is done once get people runs
// 		expect(data.count).toEqual(87);
// 		done();
// 	})
// })

it('calls swapi to get people', () => { 
	expect.assertions(1) //always have with async
	return swapi.getPeople(fetch).then(data => { //have to return promise
		expect(data.count).toEqual(87);
	})
})

it('calls swapi to get people with a promise', () => {
	expect.assertions(2)
	return swapi.getPeoplePromise(fetch).then(data => {
		expect(data.count).toEqual(87);
		expect(data.results.length).toBeGreaterThan(5)
	})
})

it('getPeople returns count and results', () => {
	const mockFetch = jest.fn()
	.mockReturnValue(Promise.resolve({
		json: () => Promise.resolve({
			count: 87,
			results:[0,1,2,3,4,5]
		})
	})) //fn for function
	expect.assertions(4)
	return swapi.getPeoplePromise(mockFetch).then(data => {
		expect(mockFetch.mock.calls.length).toBe(1);
		expect(mockFetch).toBeCalledWith('https://swapi.co/api/people');
		expect(data.count).toEqual(87);
		expect(data.results.length).toBeGreaterThan(5);
	}) //because asynchronous use return and expect*****
})


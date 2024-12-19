const { default: Expiration, getDayByWeekDay } = require("@/app/components/Expiration")
const { render, cleanup, fireEvent, getByText } = require("@testing-library/react")

describe('Expiration date Tests ', () => { 
    const mockUpdateFunction = jest.fn();
    const id = 0;
    let expiration = new Date();

    afterEach(() => {
        cleanup()
        jest.clearAllMocks()
        expiration = new Date()
    })
    test('Expiration date shows black, when it is some time in the future', () => {
        expiration.setDate(expiration.getDate() + 5)
        expiration.setFullYear(expiration.getFullYear() + 20)

        const {getByRole} = render(
            <Expiration 
                setExpirationUpdate={mockUpdateFunction}
                expiration={expiration}
                id={id}
            />
        )
        
        let exp = getByRole("dateExpiration")
        const date = `${getDayByWeekDay(expiration.getDay())}, ${expiration.getDate()}.${expiration.getMonth() + 1}.${expiration.getFullYear()}`
        expect(exp.outerHTML).toEqual(`<p style=\"font-size: 14px;\" role=\"dateExpiration\">${date}</p>`);

    })
    test('Expiration date shows red, when it is in the next 24 hours', () => {
        expiration.setMinutes(expiration.getMinutes() + 20)
        expiration.getHours(expiration.getHours() + 22)
        const {getByRole} = render(
            <Expiration 
                setExpirationUpdate={mockUpdateFunction}
                expiration={expiration}
                id={id}
            />
        )

        
        let exp = getByRole("dateExpiration")
        const date = `${getDayByWeekDay(expiration.getDay())}, ${expiration.getDate()}.${expiration.getMonth() + 1}.${expiration.getFullYear()}`

        expect(exp.outerHTML).toEqual(`<p style=\"color: red; font-size: 14px;\" role=\"dateExpiration\">${date}</p>`);
    })
    test('Expiration date shows red, when it is in today', () => {
        const {getByRole} = render(
            <Expiration 
                setExpirationUpdate={mockUpdateFunction}
                expiration={expiration}
                id={id}
            />
        )

        
        let exp = getByRole("dateExpiration")
        const date = `${getDayByWeekDay(expiration.getDay())}, ${expiration.getDate()}.${expiration.getMonth() + 1}.${expiration.getFullYear()}`
        expect(exp.outerHTML).toEqual(`<p style=\"color: red; font-size: 14px;\" role=\"dateExpiration\">${date}</p>`);
    })
    test('Expiration date shows red, when it is in the past', () => {
        expiration.setMonth(expiration.getMonth() - 1)
        expiration.setFullYear(expiration.getFullYear() - 1)

        const {getByRole} = render(
            <Expiration 
                setExpirationUpdate={mockUpdateFunction}
                expiration={expiration}
                id={id}
            />
        )

        
        let exp = getByRole("dateExpiration")
        const date = `${getDayByWeekDay(expiration.getDay())}, ${expiration.getDate()}.${expiration.getMonth() + 1}.${expiration.getFullYear()}`
        expect(exp.outerHTML).toEqual(`<p style=\"color: red; font-size: 14px;\" role=\"dateExpiration\">${date}</p>`);
    })
    test('Expiration date can be edited', () => {
        let newDate = new Date("2025-01-15")
        const {getByRole} = render(
            <Expiration 
                setExpirationUpdate={mockUpdateFunction}
                expiration={expiration}
                id={id}
            />
        )

        const role = getByRole("dateExpirationDiv")
        fireEvent.dblClick(role)
        const input = getByRole("dateExpiration")
        
        fireEvent.change(input, { target: { value: newDate.toISOString().split('T')[0] } })
        fireEvent.keyDown(input, { key: "Enter" });

        const edited = getByRole("dateExpiration")


        const date = `${getDayByWeekDay(newDate.getDay())}, ${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`
        expect(edited.outerHTML).toBe(`<p style=\"font-size: 14px;\" role=\"dateExpiration\">${date}</p>`)
    })
    test('getDayByWeekDay returns correct weekday', () => {
        let date = new Date(2006, 0, 15)
        let expected = "Sunday"

        let actual = getDayByWeekDay(date.getDay())

        expect(date.getDay()).toBe(0)
        expect(actual).toBe(expected)
    })
    


})
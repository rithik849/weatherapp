import React from 'react';
import renderer from 'react-test-renderer';
import Sidebar from './Sidebar';
import userEvent from '@testing-library/user-event'
import {render, fireEvent, screen, getByText, getByRole} from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never

let fragment : (() => (DocumentFragment | null)) = () => null;
let byText : ( OmitFirstArg<typeof getByText> | (() => null)) = () => null;
let byRole : (OmitFirstArg<typeof getByRole>) | (() => null) = () => null;
let user : UserEvent = userEvent.setup()


describe("Test sidebar interactions", () => {

    beforeEach(() => {
        const {container,asFragment,getByText,getByRole} = render(<Sidebar/>);
        fragment = asFragment
        byText = getByText
        byRole = getByRole
        user = userEvent.setup()
    })
    
    test("render the app",async () => {
        expect(fragment()).toMatchSnapshot()
    })

    test("that the sidebar opens",async () => {
        const menu_button = screen.getByRole("button")
    
    
        await user.click(menu_button as HTMLElement)
    
    
    
        expect(fragment()).toMatchSnapshot()
    })

    test("that the sidebar closes",async () => {
        let menu_button = screen.getByRole("button")
    
    
        await user.click(menu_button as HTMLElement)
        
        menu_button = screen.getByRole("button")
        await user.click(menu_button as HTMLElement)
    
        expect(fragment()).toMatchSnapshot()
    })


})


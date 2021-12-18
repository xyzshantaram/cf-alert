import cf from 'campfire.js';

const maskStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.6)',
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    position: 'fixed',
    top: 0,
    left: 0
}

const create = () => {
    document.querySelector('#alert-mask')?.remove();
    let mask = cf.insert(cf.nu('div#alert-mask', {
        style: maskStyle,
        raw: true,
        c: `<div id='cf-alert'>
        <div id='alert-header'></div>
        <div id='alert-body'></div>
        <div id='alert-footer'></div>
        </div>
        `
    }), { atEndOf: document.body });

    const header = mask.querySelector('#alert-header')!;
    const body = mask.querySelector('#alert-body')!;
    const footer = mask.querySelector('#alert-footer')!;

    return [header, body, footer, mask] as HTMLElement[];
}

function message(text: string, title = 'Info', customLabel = 'OK') {
    const [header, body, footer, mask] = create();
    return new Promise<void>((resolve, reject) => {
        try {
            header.innerHTML = cf.escape(title);
            body.innerHTML = cf.escape(text);

            cf.insert(cf.nu('button#alert-ok', {
                on: {
                    click: (e) => {
                        resolve();
                        mask.remove();
                    }
                },
                c: customLabel
            }), { atEndOf: footer });
        }
        catch (e) {
            reject(e)
        }
    })
}

function input(title: string, text: string) {
    const [header, body, footer] = create();
    return new Promise((resolve, reject) => {
        try {
            header.innerHTML = cf.escape(title);
            body.innerHTML = cf.escape(text);
        }
        catch (e) {
            reject(e)
        }
    })
}

function confirm() {
    const [header, body, footer] = create();
    return new Promise((resolve, reject) => {
        try {

        }
        catch (e) {
            reject(e)
        }
    })
}

export default { prompt, message, confirm };
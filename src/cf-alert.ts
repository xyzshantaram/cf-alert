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

function input(type: string, text: string, title = 'Input') {
    const [header, body, footer, mask] = create();
    return new Promise((resolve, reject) => {
        try {
            header.innerHTML = cf.escape(title);
            body.innerHTML = cf.escape(text);

            const set = cf.insert(cf.nu('fieldset', {
                attrs: { type: type }
            }), { atEndOf: body }) as HTMLInputElement;

            const field = cf.insert(cf.nu('input#alert-input', {
                attrs: { type: type }
            }), { atEndOf: set }) as HTMLInputElement;

            cf.insert(cf.nu('button#alert-cancel', {
                on: {
                    click: (e) => {
                        reject('Cancelled by user');
                        mask.remove();
                    }
                },
                c: "Cancel"
            }), { atEndOf: footer });

            cf.insert(cf.nu('button#alert-ok', {
                on: {
                    click: (e) => {
                        resolve(field.value);
                        mask.remove();
                    }
                },
                c: "Submit"
            }), { atEndOf: footer });
        }
        catch (e) {
            reject(e)
        }
    })
}

interface CustomLabels {
    yes?: string,
    no?: string
}

function confirm(text: string, customLabels: CustomLabels, title = 'Are you sure?') {
    const [header, body, footer, mask] = create();
    return new Promise((resolve, reject) => {
        try {
            header.innerHTML = cf.escape(title);
            body.innerHTML = cf.escape(text);

            cf.insert(cf.nu('button#alert-cancel', {
                on: {
                    click: (e) => {
                        resolve(false);
                        mask.remove();
                    }
                },
                c: customLabels?.no || "No"
            }), { atEndOf: footer });

            cf.insert(cf.nu('button#alert-ok', {
                on: {
                    click: (e) => {
                        resolve(true);
                        mask.remove();
                    }
                },
                c: customLabels?.yes || "Yes"
            }), { atEndOf: footer });

        }
        catch (e) {
            reject(e)
        }
    })
}

export default { input, message, confirm };
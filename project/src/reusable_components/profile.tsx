import { JSX } from "solid-js";

export interface User_info {
    name: string;
    img_link: string;
    text: string;
}
export function Profile({
    name, img_link, text,
}: {
    name: string;
    img_link: string;
    text: string;
}) {
    let style: HTMLElement | undefined = undefined;
    const el: JSX.Element = (<div class="profile">
        <style ref={style}>

        </style>
        <img src={img_link} alt="" />
        <div class="text">
            <h2>name: {name}</h2>
            <p>{text}</p>
        </div>
    </div>);



    style!.innerHTML = /*html*/ `.profile{
                display: flex;
                justify-content: left;
                align-items: center;

                .text{
                    margin-left: 10px;
                    font-size: small;
                    line-height: 4px;
                }
                img{
                    height: 40px;
                    width: 40px;
                    border-radius: 100%;
                }
            }`;

    return el;
}

import React from "react";
import "../style.css";

export default function ContactsPage() {
    return <div>
        <h1>Контакти</h1>
        <address>
            <strong>Телефон:</strong> <a href="tel:+380957874423">+380957874423</a>, <a href="tel:+380987409747">+380987409747</a> Галина; <a href="tel:+380977348930">+380977348930</a> Віра.<br />
            <strong>Електронна пошта:</strong> <a href="mailto:apiterapiiamivira@gmail.com">apiterapiiamivira@gmail.com</a> <br />
            <strong>Фізична адреса на гугл картах:</strong> <a href="https://maps.app.goo.gl/wpdtZocLAh8dAZHk8">Мивіра</a>
        </address>
    </div>;
}
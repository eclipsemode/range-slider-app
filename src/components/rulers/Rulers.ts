import $ from 'jquery';

class Rulers {
    private readonly selector: string;

    constructor(selector: string) {
        this.selector = selector;
    }

    // public getRulers() {
    //     return $('<div>', {
    //         class: 'slider-app__rulers'
    //     }).prependTo(`${this.selector} .slider-app`);
    // }

    getRulers() {
        return $(`
            <div class="slider-app__rulers"></div>
                <div class="slider-app__rulers-values">
                    <div class="slider-app__rulers-values--0">0</div>
                    <div class="slider-app__rulers-values--20">20</div>
                    <div class="slider-app__rulers-values--40">40</div>
                    <div class="slider-app__rulers-values--60">60</div>
                    <div class="slider-app__rulers-values--80">80</div>
                    <div class="slider-app__rulers-values--100">100</div>
                </div>
        `).prependTo(`${this.selector} .slider-app`);
    }
}

export default Rulers;
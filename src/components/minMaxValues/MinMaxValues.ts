class MinMaxValues {
    private readonly selector: string;
    private readonly min: number;
    private readonly max: number;

    constructor(selector: string, min: number, max: number) {
        this.selector = selector;
        this.min = min;
        this.max = max;
    }

    public getMinMaxValues() {
        this.getMin();
        this.getMax();
    }

    private getMin = () => {
        return $('<div>', {
            class: 'slider-app__min-value',
            text: this.min
        }).prependTo(`${this.selector} .slider-app`);
    };

    private getMax() {
        return $('<div>', {
            class: 'slider-app__max-value',
            text: this.max
        }).prependTo(`${this.selector} .slider-app`);
    }
}

export default MinMaxValues;
import $ from 'jquery';
import { ModelOption, TogglesEnum } from '../../utils';

function updateConfig ():void {
    const newSelector: string = this.selectorState.slice(1);
    const opts: ModelOption = this.getOpts();

    this.optionsState.toggleConfig.forEach((item: string): void => {
        const element: JQuery = $(`#${ newSelector }__toggle-${ item }`);

        element.on('change', (): void => {
            const value: boolean = element.prop('checked');

            switch (item) {
                case TogglesEnum.VERTICAL:
                    opts.vertical = value;
                    this.setBar();
                    this.setRulers();
                    this.setColor();
                    this.setControl();
                    this.setConfig();
                    this.setTooltip();
                    this.setVertical();
                    break;
                case TogglesEnum.RULERS:
                    opts.rulers = value;
                    this.setRulers();
                    this.setColor();
                    break;
                case TogglesEnum.PROGRESS:
                    opts.progress = value;
                    this.setBar();
                    break;
                case TogglesEnum.TOOLTIP:
                    opts.tooltip = value;
                    this.setTooltip();
                    break;
                case TogglesEnum.RANGE:
                    opts.range = value;
                    this.setBar();
                    this.setRange();
                    this.setRulers();
                    this.setColor();
                    this.setControl();
                    this.updateControl();
                    this.setConfig();
                    this.setTooltip();
                    this.setVertical();
                    break;
            }
        });
    });
}

export default updateConfig;
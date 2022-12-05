/* eslint-disable */
import $ from "jquery";
import {
  ClassName,
  ModelOption,
  ControlsEnum,
  TogglesEnum,
  abbreviateNumber,
} from "../utils";
import Observer from "../Observer/Observer";

import {
  setBar,
  setSlider,
  setRulers,
  setRange,
  setTooltip,
  setColor,
  setVertical,
  setControl,
  setConfig,
} from "./SubViews";
import { observeThumbs, observeControl, observeConfig } from "../Observer";

class View extends Observer {
  private readonly selectorState: string;

  private readonly optionsState: ModelOption;

  private readonly setSlider: CallableFunction;

  private readonly setRange: CallableFunction;

  private readonly setRulers: CallableFunction;

  private readonly setBar: CallableFunction;

  private readonly setTooltip: CallableFunction;

  private readonly setColor: CallableFunction;

  private readonly setVertical: CallableFunction;

  private readonly setControl: CallableFunction;

  private readonly setConfig: CallableFunction;

  private readonly observeThumbs: CallableFunction;

  private readonly observeControl: CallableFunction;

  private readonly observeConfig: CallableFunction;

  constructor(private selector: string, private options: ModelOption) {
    super();
    this.selectorState = selector;
    this.optionsState = options;
    this.setSlider = setSlider.bind(this);
    // this.setRulers = setRulers.bind(this);
    this.setRange = setRange.bind(this);
    this.setBar = setBar.bind(this);
    // this.setTooltip = setTooltip.bind(this);
    // this.setColor = setColor.bind(this);
    // this.setVertical = setVertical.bind(this);
    // this.setControl = setControl.bind(this);
    // this.setConfig = setConfig.bind(this);
    // this.observeThumbs = observeThumbs.bind(this);
    // this.observeControl = observeControl.bind(this);
    // this.observeConfig = observeConfig.bind(this);
  }

  render(): void {
    this.opts = this.optionsState;
    this.setSlider();
    this.setBar();
    this.setRange();
    // this.setRulers();
    // this.setColor();
    // this.setControl();
    // this.setConfig();
    // this.setTooltip();
    // this.setVertical();

    // this.thumbsObserver();
    // this.controlObserver();
    // this.configObserver();
  }

  thumbsObserver() {
    const ObserveThumbs = this.observeThumbs();
    const $thumbs: JQuery = $(".js-slider-app__input");
    const $thumbMin = $(`${this.selectorState} ${ClassName.MIN}`);
    const $thumbMax = $(`${this.selectorState} ${ClassName.MAX}`);

    const handleObserver = (e: JQuery.ChangeEvent) => {
      if ($(e.currentTarget).hasClass("js-slider-app__input-min")) {
        if (
          +$thumbMin.val() > +$thumbMax.val() - this.opts.gap &&
          this.opts.range
        ) {
          +$thumbMax.val() - this.opts.step < +$thumbMax.val() - this.opts.gap
            ? $thumbMin.val(+$thumbMax.val() - this.opts.step)
            : $thumbMin.val(+$thumbMax.val() - this.opts.gap);
        }

        ObserveThumbs.opts = {
          ...this.opts,
          from: +e.target.value,
        };
      } else {
        if (+$thumbMin.val() > +$thumbMax.val() - this.opts.gap) {
          +$thumbMin.val() + this.opts.step > +$thumbMin.val() + this.opts.gap
            ? $thumbMax.val(+$thumbMin.val() + this.opts.step)
            : $thumbMax.val(+$thumbMin.val() + this.opts.gap);
        }

        ObserveThumbs.opts = {
          ...this.opts,
          to: +e.target.value,
        };
      }
    };

    $thumbs.off("input", handleObserver);
    $thumbs.on("input", handleObserver);
  }

  controlObserver() {
    const ObserveControl = this.observeControl();

    this.opts.controlConfig.forEach((item: string): void => {
      const $element: JQuery = $(`${this.selectorState}__control-${item}`);

      const handleObserver = (e: JQuery.ChangeEvent) => {
        const $thumbMin = $(`${this.selectorState} ${ClassName.MIN}`);
        const $thumbMax = $(`${this.selectorState} ${ClassName.MAX}`);
        switch (item) {
          case ControlsEnum.MIN:
            if (+e.target.value > this.opts.max - this.opts.gap) {
              e.target.value = this.opts.max - this.opts.gap;
            }
            ObserveControl.opts = {
              ...this.opts,
              min: +e.target.value,
            };
            break;
          case ControlsEnum.MAX:
            if (+e.target.value < this.opts.min + this.opts.gap) {
              e.target.value = this.opts.min + this.opts.gap;
            }
            ObserveControl.opts = {
              ...this.opts,
              max: +e.target.value,
            };
            break;
          case ControlsEnum.STEP:
            if (+e.target.value > this.opts.max - this.opts.min) {
              e.target.value = this.opts.max - this.opts.min;
            }
            ObserveControl.opts = {
              ...this.opts,
              step: +e.target.value,
            };
            break;
          case ControlsEnum.FROM:
            if (
              +e.target.value > +$thumbMax.val() - this.opts.gap &&
              this.opts.range
            ) {
              +$thumbMax.val() - this.opts.step <
              +$thumbMax.val() - this.opts.gap
                ? (e.target.value = +$thumbMax.val() - this.opts.step)
                : (e.target.value = +$thumbMax.val() - this.opts.gap);
            }

            ObserveControl.opts = {
              ...this.opts,
              from: +e.target.value,
            };
            break;
          case ControlsEnum.TO:
            if (+$thumbMin.val() > +e.target.value - this.opts.gap) {
              +$thumbMin.val() + this.opts.step >
              +$thumbMin.val() + this.opts.gap
                ? (e.target.value = +$thumbMin.val() + this.opts.step)
                : (e.target.value = +$thumbMin.val() + this.opts.gap);
            }

            ObserveControl.opts = {
              ...this.opts,
              to: +e.target.value,
            };
            break;
        }
      };

      $element.off("change", handleObserver);
      $element.on("change", handleObserver);
    });
  }

  configObserver() {
    const ObserveConfig = this.observeConfig();

    this.opts.toggleConfig.forEach((item: string): void => {
      const $element: JQuery = $(`${this.selectorState}__toggle-${item}`);

      const handleObserver = (e: JQuery.ChangeEvent) => {
        // eslint-disable-next-line default-case
        switch (item) {
          case TogglesEnum.VERTICAL:
            ObserveConfig.opts = {
              ...this.opts,
              vertical: e.target.checked,
            };
            break;
          case TogglesEnum.RANGE:
            ObserveConfig.opts = {
              ...this.opts,
              range: e.target.checked,
            };
            break;
          case TogglesEnum.RULERS:
            ObserveConfig.opts = {
              ...this.opts,
              rulers: e.target.checked,
            };
            break;
          case TogglesEnum.PROGRESS:
            ObserveConfig.opts = {
              ...this.opts,
              progress: e.target.checked,
            };
            break;
          case TogglesEnum.TOOLTIP:
            ObserveConfig.opts = {
              ...this.opts,
              tooltip: e.target.checked,
            };
            break;
        }
      };

      $element.off("change", handleObserver);
      $element.on("change", handleObserver);
    });
  }
}

export default View;
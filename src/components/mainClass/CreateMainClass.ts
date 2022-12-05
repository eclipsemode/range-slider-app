import $ from "jquery";

class CreateMainClass {
  private readonly selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  public getMainClass(): JQuery {
    return $("<div>", {
      class: "slider-app",
    }).appendTo(`${this.selector}`);
  }
}

export default CreateMainClass;
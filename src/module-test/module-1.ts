export class Module1 {
  print() {
    localPrint(`Module1.print() called`);
  }
}

function localPrint(text: string) {
  console.log(`localPrint: ${text}`);
}

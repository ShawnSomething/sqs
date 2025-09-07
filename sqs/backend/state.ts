let lastOutput: string | null = null;

export const setOutput = (msg: string) => {
  lastOutput = msg;
};

export const getOutput = () => lastOutput;

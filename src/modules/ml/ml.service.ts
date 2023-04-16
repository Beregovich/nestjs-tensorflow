import * as tf from '@tensorflow/tfjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MlService {
  public experiment() {
    const model = tf.sequential();
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CorrelationIdFromRequest = createParamDecorator(
  (data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();

    const correlationId = request['correlationId'] || null;

    return correlationId;
  },
);

import { ConfigService } from "@nestjs/config/dist/config.service";

export const jwtFactory = {
  useFactory: async (configService: ConfigService): Promise<{
    secret: string;
    signOptions: {
        expiresIn: string;
    };
}> => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('JWT_EXP_H'),
    },
  }),
  inject: [ConfigService],
};

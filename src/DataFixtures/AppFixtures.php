<?php

namespace App\DataFixtures;

use App\Entity\Book;
use App\Entity\Score;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for ($i = 0; $i < 15; $i++) {
            $user = new User();

            $password = $this->encoder->encodePassword($user, 'password');

            $user->setEmail($faker->email)
                ->setPassword($password);

            $manager->persist($user);

            for ($j = 0; $j < mt_rand(5, 35); $j++) {
                $book = new Book();
                $book->setTitle($faker->text(20))
                    ->setAuthor("$faker->firstName $faker->lastName")
                    ->setSummary($faker->text(255))
                    ->setUser($user);

                $score = new Score();
                $score->setComment($faker->text)
                    ->setScore(mt_rand(0, 5))
                    ->setCreatedAt($faker->dateTimeBetween('-6 months'))
                    ->setUser($user)
                    ->setBook($book);

                $book->addScore($score);

                $manager->persist($book);
                $manager->persist($score);
            }

        }

        $manager->flush();
    }
}
